import { useState } from "react";
import { instance } from "../../api";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import "./Table.scss";
import { toast } from "react-toastify";

const Table = ({ data, setData }) => {
  const [successMessage, setSuccessmessage] = useState("");
  function handleDelete(id) {
    instance
      .delete(`/work/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item?.id !== id));
        setSuccessmessage(`${id} was Successfully deleted`);
        setTimeout(() => setSuccessmessage(""), 2000);
        toast.success("Success deleted")
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
                  <button className="edit">
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
    </>
  );
};

export default Table;
