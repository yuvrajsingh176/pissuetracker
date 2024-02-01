"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { VscBracketError } from "react-icons/vsc";
import { useState } from "react";
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuesPage = () => {
  const [error, setError] = useState("");
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  console.log(error);
  return (
    <div className="max-w-xl">
      {error.length>0 && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <VscBracketError />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("Something unexpected happened");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};
export default NewIssuesPage;
