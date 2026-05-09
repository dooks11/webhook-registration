npm run deploy
npm install @react-router/cloudflare @cloudflare/workers-types
npm i react-router
npx create-react-router@latest my-react-router-app
cd my-react-router-app
npm i
npm run dev
npx create-react-router@latest --template remix-run/react-router-templates/<template-name>
npx create-vite@latest
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
const router = createBrowserRouter([
  {     path: "/",;     element: <div>Hello World</div>,;   },; ]);
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
import { createBrowserRouter } from "react-router";
function Root() {   return <h1>Hello world</h1>;
}
const router = createBrowserRouter([
  { path: "/", Component: Root },; ]);
createBrowserRouter([
  {     path: "/",;     Component: Root,;     children: [;       { index: true, Component: Home },;       { path: "about", Component: About },;       {         path: "auth",;         Component: AuthLayout,;         children: [;           { path: "login", Component: Login },;           { path: "register", Component: Register },;         ],;       },;       {         path: "concerts",;         children: [;           { index: true, Component: ConcertsHome },;           { path: ":city", Component: ConcertsCity },;           { path: "trending", Component: ConcertsTrending },;         ],;       },;     ],;   },; ]);
import {
  createBrowserRouter,
  useLoaderData,
} from "react-router";
createBrowserRouter([
  {     path: "/teams/:teamId",;     loader: async ({ params }) => {
      let team = await fetchTeam(params.teamId);
      return { name: team.name };
    },
    Component: Team,
  },
]);
function Team() {   let data = useLoaderData();
  return <h1>{data.name}</h1>;
}
createBrowserRouter([
  {     path: "/dashboard",;     Component: Dashboard,;     children: [;       { index: true, Component: Home },;       { path: "settings", Component: Settings },;     ],;   },; ]);
import { Outlet } from "react-router";
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* will either be <Home> or <Settings> */}
      <Outlet />
    </div>
  );
}
createBrowserRouter([
  {     // no path on this parent route, just the component;     Component: MarketingLayout,;     children: [;       { index: true, Component: Home },;       { path: "contact", Component: Contact },;     ],;   },;    {     path: "projects",;     children: [;       { index: true, Component: ProjectsHome },;       {         // again, no path, just a component for the layout;         Component: ProjectLayout,;         children: [;           { path: ":pid", Component: Project },;           { path: ":pid/edit", Component: EditProject },;         ],;       },;     ],;   },; ]);
import { useActionData } from "react-router";
export function LoginForm() {
  const actionData = useActionData();
  const errors = actionData?.errors;
  return (
    <Form method="post">
      <label>
        <input type="text" name="username" />
        {errors?.username && <div>{errors.username}</div>}
      </label>
      <label>
        <input type="password" name="password" />
        {errors?.password && <div>{errors.password}</div>}
      </label>
      <button type="submit">Login</button>
    </Form>
  );
}
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
.github/workflows/cf_publish_release_npm.yml
npm ci
cd cloudflare
npm run build
cd cloudflare/example
npx wrangler deploy
npm create cloudflare@latest -- --template cloudflare/agents-starter
cd agents-starter
npm install
npm run dev
// wrangler.json
"name": "workers-playground-falling-pine-0f21",
curl   -d '{"url":"<video_url>","meta":{"name":"<video_name>"}}'   -H "Authorization: Bearer <api_token>"   https://api.cloudflare.com/client/v4/accounts/f104e6c80ad2359369f6bab9142e08b4/stream/copy
npm i @cloudflare/stream-react
npm create cloudflare@latest -- --template=cloudflare/templates/react-router-starter-template
npm install
npm run dev
npm run typegen
npm run build
WARNING: Found ~/.bashrc but no ~/.bash_profile, ~/.bash_login or ~/.profile.
This looks like an incorrect setup.
A ~/.bash_profile that loads ~/.bashrc will be created for you.
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
{"result":null,"success":false,"errors":[{"code":7003,"message":"Could not route to /client/v4/accounts/stream/live_inputs, perhaps your object identifier is invalid?"}],"messages":[]}
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ .github/workflows/cf_publish_release_npm.yml
bash: .github/workflows/cf_publish_release_npm.yml: No such file or directory
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ npm ci
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@primer/react-brand@0.67.0',
npm WARN EBADENGINE   required: { node: '>=24.0.0', npm: '>=8.0.0' },
npm WARN EBADENGINE   current: { node: 'v20.10.0', npm: '10.2.3' }
npm WARN EBADENGINE }
added 6 packages, and audited 7 packages in 1s
found 0 vulnerabilities
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ cd cloudflare
npm run build
bash: cd: cloudflare: No such file or directory
npm ERR! Missing script: "build"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run
npm ERR! A complete log of this run can be found in: C:\Users\Admin\AppData\Local\npm-cache\_logs\2026-05-08T20_46_45_176Z-debug-0.log
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ cd cloudflare/example
npx wrangler deploy
bash: cd: cloudflare/example: No such file or directory
Need to install the following packages:
wrangler@4.90.0
Ok to proceed? (y) y
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'wrangler@4.90.0',
npm WARN EBADENGINE   required: { node: '>=22.0.0' },
npm WARN EBADENGINE   current: { node: 'v20.10.0', npm: '10.2.3' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@cloudflare/kv-asset-handler@0.5.0',
npm WARN EBADENGINE   required: { node: '>=22.0.0' },
npm WARN EBADENGINE   current: { node: 'v20.10.0', npm: '10.2.3' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'miniflare@4.20260507.1',
npm WARN EBADENGINE   required: { node: '>=22.0.0' },
npm WARN EBADENGINE   current: { node: 'v20.10.0', npm: '10.2.3' }
npm WARN EBADENGINE }
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'undici@7.24.8',
npm WARN EBADENGINE   required: { node: '>=20.18.1' },
npm WARN EBADENGINE   current: { node: 'v20.10.0', npm: '10.2.3' }
npm WARN EBADENGINE }
Wrangler requires at least Node.js v22.0.0. You are using v20.10.0. Please update your version of Node.js.
Consider using a Node.js version manager such as https://volta.sh/ or https://github.com/nvm-sh/nvm.
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ npm create cloudflare@latest -- --template cloudflare/agents-starter
create-cloudflare requires at least Node.js v22.0.0. You are using v20.10.0. Please update your version of Node.js.
Consider using a Node.js version manager such as https://volta.sh/ or https://github.com/nvm-sh/nvm.
npm ERR! code 1
npm ERR! path C:\Users\Admin
npm ERR! command failed
npm ERR! command C:\Windows\system32\cmd.exe /d /s /c create-cloudflare --template cloudflare/agents-starter
npm ERR! A complete log of this run can be found in: C:\Users\Admin\AppData\Local\npm-cache\_logs\2026-05-08T20_54_32_860Z-debug-0.log
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ cd agents-starter
npm install
npm run dev
bash: cd: agents-starter: No such file or directory
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@primer/react-brand@0.67.0',
npm WARN EBADENGINE   required: { node: '>=24.0.0', npm: '>=8.0.0' },
npm WARN EBADENGINE   current: { node: 'v20.10.0', npm: '10.2.3' }
npm WARN EBADENGINE }
up to date, audited 7 packages in 566ms
found 0 vulnerabilities
npm ERR! Missing script: "dev"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run
npm ERR! A complete log of this run can be found in: C:\Users\Admin\AppData\Local\npm-cache\_logs\2026-05-08T20_54_55_543Z-debug-0.log
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ // wrangler.json
"name": "workers-playground-falling-pine-0f21",
bash: //: Is a directory
bash: name:: command not found
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ curl   -d '{"url":"<video_url>","meta":{"name":"<video_name>"}}'   -H "Authorization: Bearer <api_token>"   https://api.cloudflare.com/client/v4/accounts/f104e6c80ad2359369f6bab9142e08b4/stream/copy
{"success":false,"errors":[{"code":9106,"message":"Authentication failed (status: 400)"}],"messages":[],"result":null}
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ npm i @cloudflare/stream-react
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@primer/react-brand@0.67.0',
npm WARN EBADENGINE   required: { node: '>=24.0.0', npm: '>=8.0.0' },
npm WARN EBADENGINE   current: { node: 'v20.10.0', npm: '10.2.3' }
npm WARN EBADENGINE }
added 1 package, and audited 8 packages in 1s
found 0 vulnerabilities
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ npm create cloudflare@latest -- --template=cloudflare/templates/react-router-starter-template
create-cloudflare requires at least Node.js v22.0.0. You are using v20.10.0. Please update your version of Node.js.
Consider using a Node.js version manager such as https://volta.sh/ or https://github.com/nvm-sh/nvm.
npm ERR! code 1
npm ERR! path C:\Users\Admin
npm ERR! command failed
npm ERR! command C:\Windows\system32\cmd.exe /d /s /c create-cloudflare --template=cloudflare/templates/react-router-starter-template
npm ERR! A complete log of this run can be found in: C:\Users\Admin\AppData\Local\npm-cache\_logs\2026-05-08T21_27_32_140Z-debug-0.log
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ npm install
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: '@primer/react-brand@0.67.0',
npm WARN EBADENGINE   required: { node: '>=24.0.0', npm: '>=8.0.0' },
npm WARN EBADENGINE   current: { node: 'v20.10.0', npm: '10.2.3' }
npm WARN EBADENGINE }
up to date, audited 8 packages in 603ms
found 0 vulnerabilities
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ npm run dev
npm ERR! Missing script: "dev"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run
npm ERR! A complete log of this run can be found in: C:\Users\Admin\AppData\Local\npm-cache\_logs\2026-05-08T21_27_57_758Z-debug-0.log
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ npm run typegen
npm ERR! Missing script: "typegen"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run
npm ERR! A complete log of this run can be found in: C:\Users\Admin\AppData\Local\npm-cache\_logs\2026-05-08T21_28_15_382Z-debug-0.log
Admin@DESKTOP-UEEC5VE MINGW64 ~
$ npm run build
npm ERR! Missing script: "build"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run
npm ERR! A complete log of this run can be found in: C:\Users\Admin\AppData\Local\npm-cache\_logs\2026-05-08T21_28_30_942Z-debug-0.log
Admin@DESKTOP-UEEC5VE MINGW64 ~
$
npm run preview
npm run build
npm run deploy
npx wrangler versions upload
npx wrangler versions deploy
curl -X POST -H "Authorization: Bearer <API_TOKEN>" -D '{"meta": {"name":"test stream"},"recording": { "mode": "automatic" }}' https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/direct_upload --header 'Authorization: Bearer <API_TOKEN>'  --data '{
    "maxDurationSeconds": 3600
 }'
{   "result": {;     "uploadURL": "https://upload.videodelivery.net/f65014bc6ff5419ea86e7972a047ba22",;     "uid": "f65014bc6ff5419ea86e7972a047ba22";   },;   "success": true,;   "errors": [],;   "messages": []; }
curl --request POST   --form file=@/Users/mickie/Downloads/example_video.mp4   https://upload.videodelivery.net/f65014bc6ff5419ea86e7972a047ba22
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_settings"   --request PATCH   --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"   --json '{
    "foundation_dns": true
  }'
npm install @opencode-ai/sdk
npm install -g opencode-ai
curl -fsSL https://opencode.ai/install | bash
