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
        <thead>
          <tr>
            {props.fields.map((v, i) => {
              return (
                <th className="column" key={v.id}>
                  <div className="header-container">
                    {v.name}
                    <Twemoji options={{ className: "twemoji" }}>
                      {v.emoji}
                    </Twemoji>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.items.map((v, i) => {
            return (
              <tr
                key={i}
                className="hover"
                onClick={() => {
                  if (props.onClick) {
                    props.onClick.method(v[props.onClick.field]);
                  }
                }}
              >
                {props.fields.map((fv, fi) => {
                  return <td key={fv.id}>{v[fv.field]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
