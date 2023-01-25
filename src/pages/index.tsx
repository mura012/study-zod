import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "../styles/Home.module.css";

const schema = z
  .object({
    lastName: z.literal("山田", {
      errorMap: () => ({
        message: "姓は山田にしてください",
      }),
    }),
    firstName: z.string().min(1, "名は必須です").trim(),
    address: z
      .string()
      .email("メールアドレスの形式がおかしいです")
      .min(1, "必須です"),
  })
  // 姓と名をくっつける
  // ...argで元々あるschemaを残す
  .transform((arg) => {
    return {
      ...arg,
      fullName: `${arg.lastName} ${arg.firstName}}`,
    };
  });
// z.inferでschemaから型を作る
type Form = z.infer<typeof schema>;

export default function Home() {
  // react-hook-formのhooksを使用
  // registerは
  const {
    register,
    handleSubmit,
    formState: { errors },
    // resolverを設定してzodと連携
  } = useForm<Form>({ resolver: zodResolver(schema) });
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className={classes.wrapper}
      >
        <label>
          <span>姓</span>
          <input {...register("lastName")} />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </label>
        <label>
          <span>名</span>
          <input {...register("firstName")} />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </label>
        <label>
          <span>メールアドレス</span>
          <input {...register("address")} />
          {errors.address && <span>{errors.address.message}</span>}
        </label>
        <button>送信</button>
      </form>
    </>
  );
}
