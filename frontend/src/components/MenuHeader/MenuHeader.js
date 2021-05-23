import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { getAllCategories } from "../../actions";

const MenuHeader = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        <li key={category._id}>
          {category.parentId ? (
            <a href={category.slug}>{category.name}</a>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryList;
  };

  return (
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default MenuHeader;