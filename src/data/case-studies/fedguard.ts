import type { CaseStudy } from '../projects';

const caseStudy: CaseStudy = {
  problem:
    'Detecting spoken hate speech usually means shipping audio to a server. That is exactly the data you should not be centralising. Federated learning removes the need — each device trains locally and only model updates travel — but it assumes the participating hardware can actually train. One of the three nodes was an NVIDIA Jetson Nano with 4 GB of memory shared between CPU and GPU, on CUDA 10.2 and Python 3.8. Making it a genuine participant, rather than a device that merely receives the finished model, was the whole engineering problem.',
  screenshot: {
    width: 1400,
    height: 642,
    alt: 'The FedGuard command centre in dark mode. Cards show hate flags, devices online, live listener count, model accuracy and model F1. Below, a bar chart breaks flags down by device between the client laptop and the Jetson Nano, alongside a live hate-flag feed listing each detection with its device, timestamp and confidence.',
    caption: 'The command centre during a live session, with both nodes online. Flags are attributed per device, so the laptop and the Jetson are visible as separate participants rather than one aggregate.',
  },
  architecture:
    'Flower running FedAvg across three physical machines. The dataset of 726,119 labelled rows is split stratified with seed 42: 70% to the laptop client (508,282 rows), 25% to the Jetson Nano (181,529), and a 5% server holdout (36,308) that is only ever evaluated against, never trained on. An all-MiniLM sentence encoder is frozen and its 384-dimension L2-normalised embeddings are precomputed to disk before training begins, so the training loop only ever touches a 361,602-parameter classifier head. The live path runs Silero VAD for speech detection into Whisper tiny.en on CUDA, behind FastAPI with a WebSocket for streaming results.',
  decisions: [
    {
      title: 'Freeze the encoder and precompute every embedding',
      body: 'Each sentence is embedded once, before training, and cached to disk. During training there are zero encoder inferences — only a 361,602-parameter head is updated. This is the single reason the Nano can participate at all, and it also means each round exchanges 1,450,195 bytes rather than an entire transformer.',
      tradeoff:
        'The encoder cannot adapt to the domain. Every gain has to come from the head, which puts a ceiling on accuracy that fine-tuning the encoder would not have.',
    },
    {
      title: 'Micro-batching with gradient accumulation',
      body: 'A batch of 8 with 4 accumulation steps gives the learning behaviour of batch 32 at the memory cost of batch 8 — the difference between training and not training on a 4 GB shared-memory device.',
      tradeoff:
        'Four times as many forward and backward passes per effective batch, which shows up directly in the Nano’s round time.',
    },
    {
      title: 'Measure the straggler cost rather than assume it',
      body: 'FedAvg is synchronous, so every round completes at the speed of the slowest device. The Nano averaged 1,061 s per round against the laptop’s 363 s — 2.9× longer while training on less than half the data. That is what makes the full run 8.8 hours, and it is a measured number rather than a quoted one.',
      tradeoff:
        'Synchronous aggregation buys clean, reproducible round semantics at the cost of wall-clock time. Asynchronous aggregation would recover the time and pay for it in staleness-weighted updates.',
    },
  ],
  hardestBug: {
    title: 'Whisper returning NaN logits, but only on the Nano',
    body: 'Transcription worked on the laptop and produced NaN logits on the Jetson’s GPU. The audio was being handed to Whisper from memory, and that path was numerically unstable on this device. Writing the clip to a temporary 16-bit WAV and letting Whisper load it through its own ffmpeg path — the one it is actually tested against — produced correct output every time.',
    lesson:
      'The fast path around a library’s own I/O is the path nobody has tested on your hardware. On constrained devices, the documented route is often the only reliable one.',
  },
  solved: [
    {
      problem:
        'PyTorch would not install on the Nano at all. CUDA 10.2 on aarch64 with Python 3.8 is outside the range of every official wheel.',
      fix: 'Built the environment from community aarch64 wheels with numpy and tokenizers pinned to compatible versions, and grpcio compiled from source.',
    },
    {
      problem:
        'Detection latency was 30–40 seconds per utterance, which is not real-time by any definition.',
      fix: 'Traced it to Whisper running on CPU and padding every clip to a full 30-second window regardless of length. Moving to tiny.en on CUDA removed the padding cost and brought latency into a usable range.',
    },
    {
      problem:
        'Whisper hallucinated phantom repeated phrases during near-silence, producing confident transcriptions of nothing.',
      fix: 'Set temperature to 0, disabled condition_on_previous_text so one bad segment could not seed the next, and applied no-speech and log-probability thresholds.',
    },
    {
      problem:
        'A CUDA out-of-memory spike part way through an eight-hour federated run would destroy the entire run.',
      fix: 'Added a recovery handler that catches the OOM, halves the batch size and doubles the accumulation steps to hold the effective batch constant, then retries. The run survives the spike instead of dying at hour six.',
    },
  ],
  results:
    '30 federated rounds to 87.11% accuracy at threshold 0.50 on the 36,308-row holdout, and 87.72% F1 at threshold 0.34 with 91.97% recall against 83.84% precision. A centralised baseline on the same data reaches 89.70%, so federation costs roughly 2.5 points — the price of no raw text ever leaving a device. Each round moves 5.8 MB across the network, about 174 MB for the full run, against a total wall clock of 8.8 hours bounded by the Nano.',
};

export default caseStudy;
