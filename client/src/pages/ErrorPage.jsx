import { useRouteError } from 'react-router-dom';

function ErrorPage(props) {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Ooops!</h1>
      <p>Maaf, terjadi kesalahan</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
