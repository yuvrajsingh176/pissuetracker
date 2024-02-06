import { Pencil2Icon } from "@radix-ui/react-icons";

import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditissueBtn = ({ issueId }:{issueId:number}) => {
  return (
    <div>
      <Button>
        <Pencil2Icon />
        <Link href={`/issues/${issueId}/edit`}>Edit issue</Link>
      </Button>
    </div>
  );
};

export default EditissueBtn;
