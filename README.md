new change 
new change again

Todays change again on 20 jan 2025
# Project Setup
- Clone the repository first:
```console
git clone https://github.com/UserShub/Coredge_Assessment.git
```

- First, activate the virtual environment (env) with the command:
```console 
source env/bin/activate
```
 
- Next cd into the backend directory, and run the command to install the dependencies with either pip or pip3 according to proper version installed in the system:
```console
pip3 install -r requirements.txt
```

- Install Gstreamer accordingly and for macOs use homebrew command:
```console
brew install gstreamer
```

- Go inside of backend folder and run the below command to start the server on localhost:5000:
```console
flask --app av-record run
```

- Now, open frontend directory and copy the absolute path reference of frontend.html.

- Start and stop recording accordingly and get the recorded sessions inside the backend folder named audi_video_recordings in mkv and mp4 formats.

[Watch the video](https://drive.google.com/file/d/133bpZGn6AJBJETPbXNoRv_rYumuf0dOL/view?usp=sharing)
