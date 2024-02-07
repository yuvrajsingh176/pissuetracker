import { Pencil2Icon } from "@radix-ui/react-icons";

import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditissueBtn = ({ issueId }: { issueId: number }) => {
  return (
    <div>
      <Button className="w-1/2 text-center ">
        <Pencil2Icon />
        <Link href={`/issues/${issueId}/edit`}>Edit</Link>
      </Button>
    </div>
  );
};

export default EditissueBtn;
