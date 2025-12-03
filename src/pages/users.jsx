import UserForm from "../components/users/user.form"
import UsersTable from "../components/users/user.table"
import { fetchAllUserAPI } from '../services/api.service';
import { useEffect, useState } from 'react';

const UsersPage = () => {
    const [userData, setUserData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    // empty array = run once
    // not empty => next value !== previous value
    useEffect(() => {
        loadUser();
    }, [current, pageSize]); //[] + condition
    console.log('check current & page size >>>', current, pageSize);
    // Get all users 
    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize);
        if (res.data) {
            setUserData(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        console.log({ current, pageSize, total, userData })
    }

    return (
        <div style={{ margin: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UsersTable
                userData={userData}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize} />
        </div>
    )
}
export default UsersPage