import useAuth from "../../../hooks/useAuth";


const Home = () => {
    const {successToast} = useAuth();

    const notify = () => successToast("something wrong");

    return (
        <div>
            <h1>This is Home Page</h1>
            <button onClick={notify}>Make me a toast</button>
        </div>
    );
};

export default Home;