import { Metadata } from "next";
import { PageNotFound } from "./components";

export const metadata: Metadata = {
  title: "Uniux | Page Not Found",
  description: "This page doesn't exist.",
};

const NotFound: React.FC = () => {
  return <PageNotFound />;
};

export default NotFound;
