import { useSelector } from "react-redux";

function parsePermissions(permissionArray) {
  const result = {};

  permissionArray.forEach((permission) => {
    const [action, ...modelParts] = permission.split("_");
    const model = modelParts.join("_");

    if (!result[model]) {
      result[model] = [];
    }

    result[model].push(action);
  });

  return result;
}

export default function useCheckRole(model, action) {
  const permissions = useSelector(
    (state) => state.staffAuth.staffInfo.role.rolePermissions
  );

  const groupedPermissions = parsePermissions(permissions);
  const actions = groupedPermissions[model];

  if (!Array.isArray(actions)) return false;

  return actions.includes(action);
}
