import UserForm from "../components/users/user.form"
import UsersTable from "../components/users/user.table"

const UsersPage = () => {
    return (
        <div style={{ margin: "20px" }}>
            <UserForm />
            <UsersTable />
        </div>
    )
}
export default UsersPage