import * as S from "styles/UserList.modules";
import { NextPage } from "next";
import Navbar from "components/common/Navbar";
import User from "components/User";

const IndexPage: NextPage = function () {
  return (
    <S.UserList>
      <User />
      <Navbar />
    </S.UserList>
  );
};
export default IndexPage;
