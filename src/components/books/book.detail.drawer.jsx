import { Drawer } from 'antd';
import { Descriptions, Button } from 'antd';
import { useEffect, useState } from 'react';

const BookDetail = (props) => {
    const { drawerOpen, setDrawerOpen, bookCurrentDetail, setBookCurrentDetail } = props;
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [author, setAuthor] = useState();
    const [quantity, setQuantity] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [category, setCategory] = useState();

    useEffect(() => {
        if (bookCurrentDetail) {
            setId(bookCurrentDetail._id);
            setTitle(bookCurrentDetail.mainText);
            setPrice(bookCurrentDetail.price);
            setQuantity(bookCurrentDetail.quantity);
            setAuthor(bookCurrentDetail.author);
            setThumbnail(bookCurrentDetail.thumbnail);
            setCategory(bookCurrentDetail.category);
        }
    }, [bookCurrentDetail]);

    const onClose = async () => {
        setDrawerOpen(false);
        setBookCurrentDetail(null);
    };
    const formatCurrency = (value) => {
        if (!value) return '';
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    const items = [
        {
            label: 'Id',
            children: id,

        },
        {
            label: 'Title',

            children: title,
        },
        {
            label: 'Author',
            children: author,
        },
        {
            label: 'Category',
            children: category,
        },

        {
            label: 'Quantity',

            children: quantity,
        },
        {
            label: 'Price',
            children: formatCurrency(price),

        }
    ];
    return (
        <>
            <Drawer
                title="Book Detail"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={drawerOpen}
                width={"55vw"}
            >
                <h3>Book Info</h3>
                <br />
                <p>Thumbnail:</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img style={{
                        width: '250px',
                        height: '250px',
                        objectFit: 'cover'
                    }} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${thumbnail}`} alt="Thumbnail" />

                </div>
                <br />
                <Descriptions layout="vertical" bordered={true} items={items} />
            </Drawer >
        </>
    );

}
export default BookDetail;