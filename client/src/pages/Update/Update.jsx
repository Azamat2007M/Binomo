import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './update.scss'
import { useGetByIdQuery } from '../../redux/features/users';
import Error from '../Error/Error';
import { useEffect, useState } from 'react';
import { TiPlus } from "react-icons/ti";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams()  
  const {data: user, isLoading, error} = useGetByIdQuery(id, {
      skip: !id
    });
  const [status, setStatus] = useState({
    status: 200,
    title:""
  })
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width <= img.height + 200 || img.height == img.width) {
        setStatus({
          status: 200,
          title:""
        })
        setImagePreview(URL.createObjectURL(file));
        setImageFile(file); 
      } else {
        setStatus({
          status: 403,
          title: "Only square images are allowed!"
        })
        e.target.value = null; 
        setImagePreview(null);
        setImageFile(null); 
      }
    };
  };
  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (imageFile) {
        formData.append("image", imageFile);
      }

      formData.append("name", name);
      setLoading(true)
      const userUpdate = await axios.patch(
        `http://localhost:8000/users/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (userUpdate){
        setLoading(false)
      }
      
      navigate("/profile");
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
    };

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <Error/> 

  return (
    <>
        <Nav/>  
        <section>
          <div className="r-wrapper">
            <div className="u-card">
              <form onSubmit={updateUser}>
                <h1>Editor</h1>
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="avatar preview" />
                  </div>
                ) : (
                  <div className={status.status == 200 ? "image-upload" : "image-upload e-upload"}>
                    <TiPlus />
                  </div>
                )}
                <div className="custom-file-input">
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <div className={status.status == 200 ? "login-d" : "login-e"}>
                    <b>{status.status == 200 ? null : status?.title}</b>
                  </div>
                  <label htmlFor="file" style={{marginTop: "20px"}}>Выберите файл</label>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <button type="submit" className="btnlogin">
                  {loading ? <>
                    <div className="loadingio-spinner-spinner-2by998twmg8"><div className="ldio-yzaezf3dcmj">
                      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div></div>
                    <div className="loading-space"></div>
                  </> : "Submit"}
                </button>
                <div className="a-down">
                  <b>Don't want to edit?</b>
                  <Link to={'/profile'}>Back</Link>
                </div>
              </form>
            </div>
          </div>
        </section>
        <Footer/>
    </>
  )
}

export default Update