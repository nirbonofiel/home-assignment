import { Avatar, AvatarProps } from "@mui/material";
import { UserData } from "../../types";
import { forwardRef } from "react";
import { deepOrange } from '@mui/material/colors';

type UserAvatarProps = AvatarProps & {
  user?: UserData;
};

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: deepOrange[400],
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ user, ...props }, ref) => {
    return user?.avatar?
    <Avatar alt={user?.name} src={user?.avatar} ref={ref} {...props} />:
    <Avatar alt={user?.name} {...stringAvatar(user?.name||'')} ref={ref} {...props} />;
  }
);