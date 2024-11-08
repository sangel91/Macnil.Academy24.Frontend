# Instructions

How to start the application

## Installation with Visual Studio Code and Docker

1. Download [Docker](https://www.docker.com/get-started) (On Windows, if not enabled, see the documentation [WSL2](https://docs.docker.com/desktop/windows/wsl/))
2. Download [Visual Studio Code](https://code.visualstudio.com/)
3. Add the following extensions in Visual Studio Code:

- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
- [Remote - Container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

4. Clone locally your desired repository
```bash
git clone [REPOSITORY_URL]
```

5. Move into the folder with the terminal
```bash
mv [REPOSITORY_FOLDER_NAME]
```
6. Type on terminal:
```bash
code .
```

7. Once Visual Studio Code is open, click "reopen on container" on the bottom right
8. Open a new terminal in Visual Studio Code and type:
```bash
cd frontend

npm install
```

## Installation only with Docker

1. Download [Docker](https://www.docker.com/get-started) (On Windows, if not enabled, see the documentation [WSL2](https://docs.docker.com/desktop/windows/wsl/))
2. Clone locally your desired repository
```bash
git clone [REPOSITORY_URL]
```

3. Move into the folder with the terminal
```bash
mv [REPOSITORY_FOLDER_NAME]
```
4. Type on terminal:
```bash
docker-compose up -d
```

5.  Once the container has been created, attach the terminal to it by the means of the following instruction:
```bash
docker exec -it gtfleet_frontend
```

6. Inside the attached terminal, type:

```bash
cd /home/node/frontend

npm install
```

## Usage

Start the application with:

```bash
#if use installation only docker go on the correct folder with "cd /home/node"
cd frontend

npm start
```

Go on [localhost](http://localhost:3000)

