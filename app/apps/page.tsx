import Header from "../../components/Header";


export default function Apps() {
  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold mb-6">Apps</h1>

      <p className="text-gray-300 mb-6">
        自作アプリの一覧。ここから各ページに飛べるようになるよ。
      </p>

      <ul className="space-y-4">
        <li><a href="/nobulog/apps/sample">・Sample App</a></li>
      </ul>
    </>
  );
}
