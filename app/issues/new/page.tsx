"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { VscBracketError } from "react-icons/vsc";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issuesschema } from "@/app/Validschema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issuesschema>;

const IssueForm = async () => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issuesschema),
  });
  const router = useRouter();

  return (
    <div className="max-w-xl">
      {error.length > 0 && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <VscBracketError />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={async (data) => {
          try {
            setSubmitting(true);
            console.log(data);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setSubmitting(false);
            console.log(error);
            setError("Something unexpected happened");
          }
        }}
      >
        <TextField.Root>
          <TextField.Input
            // defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          // defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}

        <Button disabled={isSubmitting}>
          {false ? "Edit" : "Submit New Issue"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};
export default IssueForm;
