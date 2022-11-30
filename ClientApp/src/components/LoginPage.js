import { useNavigate } from 'react-router-dom';
import { apiPost } from './ApiPost';
import { baseUrl } from './BaseUrl';

export function LoginPage(props) {
    const navigate = useNavigate();

    
    function saveJwtToken(token, expiresAt) {
        localStorage.setItem("jwt", token);
        localStorage.setItem("jwtExpiresAt", new Date(expiresAt).toUTCString());
    }



    async function loginUser() {
        let username = document.querySelector("#username").value
        let password = document.querySelector("#password").value

        let data = {
            Username: username,
            Password: password
        };
        let token = await apiPost(`${baseUrl()}Account/loginUser`, data);
        saveJwtToken(token["access_token"], token["expiresAt"])

        sessionStorage.setItem("name", username);
        props.setUserLoggedIn(true);

        navigate('/');
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
                            Username
                                <input type="username" className="form-control" id="username" required />
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
                    <button type="button" className="btn btn-primary" id="login-btn" onClick={loginUser}>Login</button>
                </div>
        </div>

        <div>
                <a href="/" className="back-to-home-btn">Back to Home</a>
        </div>
        </div>
        );
}