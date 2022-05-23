import React, {useRef, useState} from "react";
import swal from'sweetalert2';

const Login = (props) => {
    const usuarioInput = useRef(null);
    const passwordInput = useRef(null);

    //const [passwordHidden, setPasswordHidden] = useState(true);

    /* const seePassEyeOnClick = () => {
        passwordInput.current.type = 'text';
        setPasswordHidden(false);
    };

    const hidePassEyeOnClick = () => {
        passwordInput.current.type = 'password';
        setPasswordHidden(true);
    }; */

    const handleLogin = () => {
        let user = usuarioInput.current.value
        let pass = passwordInput.current.value

        if (user === "mati" && pass === "1234") {
            window.location.replace('/students');
        }
        else {
            return swal.fire("Atención !", "Usuario o contraseña incorrectos", "error")
        }
    }

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <form>
                <div className="formRow">
                  <div className="form-control-label">
                    <label>
                      <b>Usuario</b>
                    </label>
                  </div>
                  <div className="form-control-input">
                    <input
                      type="text"
                      ref={usuarioInput}
                      className="form-control"
                      id="nickUser"
                      placeholder="Nombre de usuario"
                      onChange={(e) => {
                        props.updateNick(e.target.value);
                      }}
                    ></input>

                    {/* <BeShowed show={props.nick === ''}>
                                <span className="text-muted"><b>*Este es un campo obligatorio</b></span>
                            </BeShowed> */}
                  </div>
                </div>
                <div className="formRow">
                  <div className="form-control-label">
                    <label>
                      <b>Contraseña</b>
                    </label>
                    &nbsp;
                    {/* {
                                passwordHidden ?
                                    <FontAwesomeIcon className="see-pass-eye" icon={faEye} onClick={seePassEyeOnClick} /> :
                                    <FontAwesomeIcon className="hide-pass-eye" onClick={hidePassEyeOnClick} icon={faEyeSlash} />
                            } */}
                  </div>
                  <div className="form-control-input">
                    <div>
                      <input
                        ref={passwordInput}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => {
                          props.updatePassword(e.target.value);
                        }}
                      ></input>
                    </div>

                    {/* <BeShowed show={props.password === ''}>
                                <span className="text-muted"><b>*Este es un campo obligatorio</b></span>
                            </BeShowed> */}
                  </div>
                </div><br></br>
                <div className="row">
                    <div className="col-3">
                        <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>    
                    </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </>
    );
}

export default Login;
