import dynamic from "next/dynamic";
import IssueFormskeleton from "./loading";
const Issueform = dynamic(() => import("@/app/issues/_components/Issueform"), {
  ssr: false,
  loading:()=> <IssueFormskeleton/>,
});
const NewIssuePage = () => {
  return <Issueform />;
};
export default NewIssuePage;
