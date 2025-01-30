## About Odd Hobby Hobby Hub

Odd Hobby Hub is a quirky and engaging website designed to celebrate the strange, obscure, and fascinating hobbies people around the world enjoy.

## Running

Clone the repository using the following command:

```bash
git clone https://github.com/kengitahi/odd-hobbies.git
cd odd-hobbies
```

The run the following command to install dependencies:

```bash
npm install
```

You might have to force dependencies, so modift the install command to this"

```bash
npm install --legacy-peer-deps
```

Then run the following command to start the development server:

```bash
npm run dev
```

Then, run the following to start the Decap CMS server:

```bash
npx decap-server
```

This command starts a local server that acts as an intermediary between the Decap CMS admin interface (in your browser) and your local files.

When using `local_backend: true` in your Decap CMS configuration, you must run `npx decap-server` (or `yarn decap-server` if you use Yarn) in your terminal. This starts the local Decap CMS server, which is responsible for saving content files (posts and uploads) to your project's directory.

## Visit Us

You can visit Odd Hobby Hub at [https://odd-hobbies.netlify.app](https://odd-hobbies.netlify.app).
