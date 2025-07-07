import {createAccessControl} from "better-auth/plugins/access";

export const statement = {project: ["create", "view"]} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({project: ["view"]});

export const admin = ac.newRole({project: ["create", "view"]});