import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Tale() {
  return (
    <React.Fragment>
      <Title>Some tale</Title>
      <Typography component="p" variant="h4">
        content
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        another content
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          A link
        </Link>
      </div>
    </React.Fragment>
  );
}
