import "./Table.scss";
import { useState } from "react";
import { instance } from "../../api";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Modal from "../ui/Modal/Modal";

const Table = ({ data, setData }) => {
  const [successMessage, setSuccessmessage] = useState("");
  // const [editTitle, setEditTitle] = useState("");
  // const [editDescription, setEditDescription] = useState("");
  // const [editPrice, setEditPrice] = useState("");
  const [editDataForm, setEditDataForm] = useState({});
  const [updateModal, setUpdateModal] = useState(null);
  console.log(updateModal);
  function handleDelete(id) {
    instance
      .delete(`/work/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item?.id !== id));
        setSuccessmessage(`${id} was Successfully deleted`);
        setTimeout(() => setSuccessmessage(""), 2000);
        toast.success(`${id} Successfully deleted`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditId = (item) => {
    setUpdateModal(item?.id);
    setEditDataForm(item);
    // setEditTitle(item?.title || "");
    // setEditDescription(item?.description || "");
    // setEditPrice(item?.price || "");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    instance
      .put(`/work/${updateModal}`, editDataForm, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setData((prevEditData) =>
          prevEditData.map((item) =>
            item?.id === updateModal ? { ...item, ...editDataForm } : item
          )
        );
        toast.success("Successfully updated");
        setUpdateModal(null);
      })
      .catch((err) => {
        toast.error("Update failed");
      });
  };

  return (
    <>
      <div className="table_wrapper">
        {successMessage && <p className="success_message">{successMessage}</p>}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, id) => (
              <tr key={id}>
                <td>{item?.id}</td>
                <td>
                  <img src={item?.image} alt="" />
                </td>
                <td>{item?.title}</td>
                <td>{item?.description}</td>
                <td>{item?.price}</td>
                <td>
                  <button className="edit" onClick={() => handleEditId(item)}>
                    <MdModeEditOutline />
                  </button>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item?.id)}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {updateModal && (
        <Modal close={setUpdateModal}>
          <div className="create_new">
            <div className="create_new-header">
              <h3>Create New User</h3>
            </div>

            <form onSubmit={handleUpdate}>
              <div>
                <label htmlFor="">Enter Image</label>
                <input type="file" />
              </div>
              <div>
                <label htmlFor="">Enter Title</label>
                <input
                  type="text"
                  value={editDataForm.title}
                  onChange={(e) =>
                    setEditDataForm({ ...editDataForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="">Enter Description</label>
                <input
                  type="text"
                  value={editDataForm.description}
                  onChange={(e) =>
                    setEditDataForm({
                      ...editDataForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="">Enter Price</label>
                <input
                  type="number"
                  value={editDataForm.price}
                  onChange={(e) =>
                    setEditDataForm({ ...editDataForm, price: e.target.value })
                  }
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

export default Table;

{
  /* <Modal close={setUpdateModal}>
<div className="create_new">
  <div className="create_new-header">
    <h3>Update User</h3>
  </div>

  <form onSubmit={handleUpdate}>
    <div>
      <label htmlFor="">Enter Image</label>
      <input type="file" />
    </div>
    <div>
      <label htmlFor="">Enter Title</label>
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="">Enter Description</label>
      <input
        type="text"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="">Enter Price</label>
      <input
        type="number"
        value={editPrice}
        onChange={(e) => setEditPrice(e.target.value)}
      />
    </div>
    <button>Submit</button>
  </form>
</div>
</Modal> */
}
