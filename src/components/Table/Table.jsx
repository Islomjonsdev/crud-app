import { useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import "./Table.scss";
import { instance } from "../../api";

const Table = ({ data, setData }) => {
  function handleDelete(id) {
    instance
      .delete(`/work/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item?.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="table_wrapper">
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
                  <button className="delete" onClick={() => handleDelete(item?.id)}>
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
