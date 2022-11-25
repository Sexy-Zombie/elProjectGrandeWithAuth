import { useNavigate } from 'react-router-dom';

export function LoginPage(props) {
    let baseUrl = "https://localhost:44449/"
    const navigate = useNavigate();

    async function getUsers() {
        let response = await fetch(`${baseUrl}api/getUsers`)
        return response.json()
    }

    async function validateUser() {
        let users = await getUsers()
        let email = document.querySelector("#email").value
        let password = document.querySelector("#password").value

        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email && users[i].password == password) {

                sessionStorage.setItem("name", users[i].username)
                props.setUserLoggedIn(true)
                navigate('/');
            } else {
                alert ("Username or password is invalid!")
            } 
            
        }

        
    }

    return (
        <div className="page-content">
        <h1>Login</h1>

        <h4 className="login-reg-title">User</h4>
        <hr />
        <div className="row login-form-block">
            <div className="col-md-4">
                <form>
                    <div className="form-group">
                        <label className="control-label">
                            Email
                            <input type="email" className="form-control" id="email" required />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Password
                            <input type="password" className="form-control" id="password" required />
                        </label>
                    </div>
                    </form>
                </div>
                <div className="form-group login-btn-block">
                    <button type="button" className="btn btn-primary" id="login-btn" onClick={validateUser}>Login</button>
                </div>
        </div>

        <div>
                <a href="/" className="back-to-home-btn">Back to Home</a>
        </div>
        </div>
        );
}