import { useNavigate } from 'react-router-dom';

export function RegistrationPage() {

    let baseUrl = "https://localhost:44449/"
    const navigate = useNavigate();

    async function apiPost(url, payload) {
        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
    }

    function registrateUser() {
        let username = document.querySelector("#username").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        let data = {
            Email: email,
            Username: username,
            Password: password
        };

        apiPost(`${baseUrl}Account/createUser`, data)

        navigate('/login');
    }

    return (
        <div className="page-content">
            <h1>Registrate</h1>

            <h4 className="login-reg-title">User</h4>
            <hr />
            <div className="row registration-form-block">
                <div className="col-md-4">
                    <form>
                        <div className="form-group">
                            <label className="control-label">
                                Username
                                <input type="text" className="form-control" id="username" required />
                            </label>
                        </div>
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
                <div className="form-group registrate-btn-block">
                    <button type="button" className="btn btn-primary" id="registrate-btn" onClick={registrateUser} href="/login">Registrate</button>
                </div>
            </div>

            <div>
                <a className="back-to-home-btn" href="/">Back to Home</a>
            </div>
        </div>
        );
}