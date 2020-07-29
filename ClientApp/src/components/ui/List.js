import React from "react";
import Twemoji from "react-twemoji";
import "./List.scss";

const List = (props) => {
  // items == list of items to display as list
  // fields == list of fields to display in order [{id, name, emoji, field}]
  // onclick == {method, fieldparam}
  // pagecount == count of pages
  // page == current page

  return (
    <div className="list-wrapper">
      <table className="table">
        <tr>
          {props.fields.map((v, i) => {
            return (
              <th className="column" key="v.id">
                {v.name}
              </th>
            );
          })}
        </tr>
        {props.items.map((v, i) => {
          return (
            <tr
              className="hover"
              onClick={() => {
                props.onClick.method(v[props.onClick.field]);
              }}
            >
              {props.fields.map((fv, fi) => {
                return <td>{v[fv.field]}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default List;
