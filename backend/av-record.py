from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/upload-audio-video', methods=['POST'])
def upload_audio_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400

    video_file = request.files['video']

    if video_file.filename == '':
        return jsonify({'error': 'No selected video file'}), 400

    save_directory = 'audio_video_recordings'
    if not os.path.exists(save_directory):
        os.makedirs(save_directory)

    video_path_webm = os.path.join(save_directory, 'recording.webm')
    video_file.save(video_path_webm)

    save_path_mp4 = os.path.join(save_directory, 'recording.mp4')

    os.system(f'gst-launch-1.0 filesrc location={video_path_webm} ! decodebin ! videoconvert ! x264enc ! mp4mux ! filesink location={save_path_mp4}')

    return jsonify({'success': 'Video file uploaded and saved as MP4'}), 200

if __name__ == '__main__':
    if not os.path.exists('audio_video_recordings'):
        os.makedirs('audio_video_recordings')

    app.run(debug=True)
