import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <Result
                status="404"
                title='Oops!'
                subTitle={error.message || error.status}
                extra={<Button type="primary">  <Link to="/">
                    <span>Back to Home Page</span>
                </Link></Button>}
            />
        </div>
    );
}
