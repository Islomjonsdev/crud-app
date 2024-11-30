import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { instance } from "../../api";
import Loading from "../Loading/Loading";
import Table from "../Table/Table";
import Modal from "../ui/Modal/Modal";
import "./Main.scss";

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const [price, setPrice] = useState("");
  console.log(data);

  const handleAdd = () => {
    setAddUser((prev) => !prev);
  };

  useEffect(() => {
    setLoading(true);
    instance
      .get("/work")
      .then((res) => {
        setData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: title,
      description: description,
      price: price,
    };
    instance
      .post(`/work`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setData(res?.data);
        setAddUser(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="main_top">
            <h1>Crud</h1>
            <span>{data?.length}</span>
            <button onClick={handleAdd}>
              <IoMdAdd />
              Create New
            </button>
          </div>
          <Table data={data} setData={setData} />
        </div>
      </div>
      {addUser && (
        <Modal close={setAddUser}>
          <div className="create_new">
            <div className="create_new-header">
              <h3>Create New User</h3>
            </div>

            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="">Enter Image</label>
                <input type="file" />
              </div>
              <div>
                <label htmlFor="">Enter Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label htmlFor="">Enter Description</label>
                <input
                  type="text"
                  onChange={(e) => setDesciption(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Enter Price</label>
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <button>Submit</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Main;
