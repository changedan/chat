import * as S from "styles/UserList.modules";
import { NextPage } from "next";
import Navbar from "components/common/Navbar";

const IndexPage: NextPage = function () {
  return (
    <S.UserList>
      <Navbar />
    </S.UserList>
  );
};
export default IndexPage;
