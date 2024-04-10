import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { UserData } from "../../types";
import "./styles.css";
import { UserAvatar } from "../UserAvatar";

type HeaderProps = {
  openPostEditor: () => void;
  handleRandomUser: () => void;
  user?: UserData;
};

export const Header: React.FC<HeaderProps> = ({ openPostEditor,user,handleRandomUser }) => {

  return (
    <AppBar position="static">
      <Toolbar disableGutters className="app-toolbar">
        {user &&
        <Tooltip title="Switch User">
          <IconButton onClick={handleRandomUser}>
            <UserAvatar user={user} className="user-avatar"/>
          </IconButton>
        </Tooltip>
        }
        <div>
          <Typography className="app-title main" variant="h6">
            BriefCam Social
          </Typography>
          <Typography className="app-title" variant="subtitle1" lineHeight={1}>
            {user?.name}
          </Typography>
        </div>
        <Tooltip title="Add Post">
          <IconButton onClick={openPostEditor}>
            <AddOutlined htmlColor="white" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
