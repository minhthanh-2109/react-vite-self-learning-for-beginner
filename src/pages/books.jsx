import { useCallback, useEffect, useState } from "react"
import BookTable from "../components/books/book.table"
import { fetchAllBookAPI } from '../services/api.service';
import BookForm from "../components/books/book.form";

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoadingTable, setIsLoadingTable] = useState(false);

    const loadBooks = useCallback(async () => {
        setIsLoadingTable(true);
        const res = await fetchAllBookAPI(current, pageSize)
        if (res.data) {
            setBooks(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total)
        }
        setIsLoadingTable(false);
    }, [current, pageSize])
    useEffect(() => {
        loadBooks();
    }, [current, pageSize]);

    // const fetchAllBooks = async () => {
    //     const res = await fetchAllBookAPI(current, pageSize)
    //     if (res.data) {
    //         setBooks(res.data.result);
    //         setCurrent(res.data.meta.current);
    //         setPageSize(res.data.meta.pageSize);
    //         setTotal(res.data.meta.total)
    //     }
    //     console.log({ current, pageSize, total, books })
    //     console.log(res.data);
    // }

    return (
        <div style={{ margin: '20px' }}>
            <BookForm loadBooks={loadBooks} />
            <BookTable
                loadBooks={loadBooks}
                isLoadingTable={isLoadingTable}
                setIsLoadingTable={setIsLoadingTable}
                books={books}
                current={current}
                pageSize={pageSize}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                total={total} />
        </div>
    )
}
export default BooksPage