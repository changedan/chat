import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage: NextPage = function () {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);

  return <></>;
};

export default IndexPage;
