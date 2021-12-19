import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a
      href="https://github.com/austintgriffith/scaffold-eth"
      className="Header"
      target="_blank"
      rel="noopener noreferrer"
    >
      <PageHeader
        title="🏗 scaffold-eth"
        subTitle="Industrial Version: create, browse, interact with contracts"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
