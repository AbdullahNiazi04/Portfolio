import type { CaseStudy } from '../projects';

/**
 * Every figure here comes from the repo audit of 2026-11-02: 65 endpoints
 * across 16 controllers, 28 Prisma models, 10 enums, 11 migrations and 25
 * socket event types. The backend is the work being described — the Flutter
 * app is a teammate's, credited on the screenshot figure and claimed nowhere.
 */
const caseStudy: CaseStudy = {
  problem:
    'The client wanted an app where a creator starts a film project, generates AI video inside it, then watches or publishes the result. Google Veo returns one clip of at most 8 seconds per job, remembers nothing between clips, refuses work with HTTP 429 when quota runs out, and offers no idempotency key. A target length of up to 15 minutes therefore needs a shot plan, a queue shared fairly across accounts, and job state that survives a restart without paying for the same clip twice. Calling a video API directly gives you none of that, and none of the accounts, profiles, library, feed and publishing the app also needed.',

  phoneShots: [
    {
      name: 'create-project',
      width: 840,
      height: 1825,
      alt: 'Create-project form: movie or series, name, genre, concept and aspect ratio',
      caption:
        'Where a run starts. These choices become the project row the shot planner reads from.',
    },
    {
      name: 'review-generation',
      width: 840,
      height: 1825,
      alt: 'Review screen listing the prompt and the settings the run will use',
      caption:
        'The prompt and settings as the API receives them. A 1:1 request is served as 16:9, because Veo 3.1 has no square output.',
    },
    {
      name: 'confirm-generate',
      width: 840,
      height: 1825,
      alt: 'Lower half of the review screen, ending in a Confirm and Generate button',
      caption:
        'Confirm & Generate hands the job to the queue. From here the run is rows in Postgres that a worker claims within 5 seconds.',
    },
    {
      name: 'generating',
      width: 840,
      height: 1825,
      alt: 'Project list with one project showing a Generating status',
      caption:
        'Generating is the state machine mid-run. Stage and attempt counts live in the same row, so a restart resumes instead of starting over.',
    },
  ],

  phoneShotsNote:
    'App interface by Umer Akhtar, the project’s Flutter developer; the backend behind it is mine. Captured September 2026, so some screens have since changed. Two reference thumbnails are masked — third-party images of unknown origin.',

  architecture:
    'Two deployables: a Flutter app built by a teammate, and the NestJS 11 API on the Fastify 5 adapter that I built, running on Railway with Prisma 6 over PostgreSQL 18. The API carries 21 Nest modules under a root module, 65 HTTP endpoints across 16 controllers, and 28 Prisma models over 10 enums and 11 migrations. A global validation pipe, exception filter, response interceptor, throttler and default-deny auth guard cover every route, with a profile guard scoping per-profile data and returning 404 to a wrong owner. Socket.IO shares the API port and pushes 23 event types after writes commit; clients send 2, to subscribe to the reels on screen. Two workers inside the API process poll Postgres every 5 seconds — one runs Gemini planning, Veo shots and ffmpeg assembly, the other converts uploaded video. Cloudflare R2 holds media, and only storage keys are persisted. Elasticsearch 9 serves search, with every hit reloaded from Postgres. better-auth handles credentials behind Nest controllers, and SMTP sends password-reset codes.',

  decisions: [
    {
      title: 'Postgres-polling workers instead of a Redis queue',
      body: 'The plan listed BullMQ; the queue shipped as database rows. Generation, GenerationShot and VideoUpload hold status, stage, the Veo operation name and attempt counts, and workers inside the API process read them every 5 seconds. Claims are conditional updateMany calls, so a second instance matches zero rows, and a restart carries on from the database rather than from memory. Deployment stayed at one service plus Postgres.',
      tradeoff:
        'Polling every 5 seconds kept the database from ever sleeping and spent the free plan’s monthly compute hours on 2026-10-20, which forced a migration mid-project. ffmpeg assembly also shares the API container’s CPU.',
    },
    {
      title: '8-second shots stored one by one, then stitched',
      body: 'Veo’s longest clip is 8 seconds, so a run becomes one GenerationShot per 8 seconds of target length, 4 in flight by default, with accounts taking turns. Each finished clip goes to R2 immediately, so a failed run keeps its clips and a retry with the same settings remakes only what is missing. Gemini repeats a fixed style and character description in every shot prompt, because Veo remembers nothing between shots.',
      tradeoff:
        'Continuity is prompted, not guaranteed: frame chaining is off by default and cannot be combined with reference photos. A crash between claiming a shot and storing its operation name requests that shot again, which Veo may bill twice.',
    },
    {
      title: 'Elasticsearch as an index, Postgres as the source of truth',
      body: 'Search returns ids and the rows are then loaded from Postgres, which re-checks visibility, so a stale document cannot expose an unpublished video. Write paths sync documents fire-and-forget after commit. Without Elasticsearch configured the API still starts, and only the 2 search endpoints are unavailable.',
      tradeoff:
        'Every search costs a second read, and there is one more store to operate. A missed sync hides or dates a result until a reindex, and a mapping change needs an index version bump and a full reindex.',
    },
  ],

  hardestBug: {
    title: 'Password-reset email that failed only on Railway',
    body: "Password-reset email never arrived from the deployed API, while everything worked locally. The log showed SMTP verification failing with connect ENETUNREACH against an IPv6 address on port 587. The Gmail App Password was the obvious suspect, so it was tested from a machine with IPv6 connectivity, where it authenticated — which moved the fault from the credential to the network path. smtp.gmail.com resolves to IPv6 first, the Railway container has no IPv6 route, and Node 18+ preserves the resolver's ordering, so nodemailer tried the AAAA record every time and never fell back. The fix was one call at the top of main.ts, before anything opens a connection: setDefaultResultOrder('ipv4first').",
    lesson:
      'When a network error names an address, check how that address was chosen before changing the credentials.',
  },

  solved: [
    {
      problem:
        'Gemini rejected shot lists pinned to around 38 shots with 400 INVALID_ARGUMENT, so every video over roughly two minutes failed at planning.',
      fix: 'Videos over 8 shots are outlined first, then written in parts of up to 8 shots. The shot count is checked in code — short parts topped up, long ones trimmed — instead of being demanded in the response schema.',
    },
    {
      problem:
        'Two workers against one database could both see the same run as finished and each create a Video row, leaving one orphaned.',
      fix: 'The PROCESSING to SUCCEEDED transition became a conditional updateMany inside the transaction. The worker that loses the race matches zero rows and backs off.',
    },
    {
      problem:
        'A 10-minute per-shot limit was checked before asking Veo, so slow but healthy clips were abandoned, requested again, and billed twice.',
      fix: 'Veo is asked first, and a finished clip is used however long it took. A shot is given up on only after 120 minutes, and Veo checks and retries use exponential backoff with jitter.',
    },
    {
      problem:
        'Runs were served oldest first, so one long video blocked every other account’s work behind it.',
      fix: 'A window-function query gives each account one shot per turn, counting the shots it already has in flight at Veo, so a 2-shot video is not stuck behind a 75-shot one.',
    },
    {
      problem:
        'Sign-out and refresh returned 500, because Flutter sends Content-Type: application/json on bodyless POSTs and Fastify rejects an empty JSON body.',
      fix: 'The app boots with Nest’s body parser off and registers its own, which treats an absent body as {} and turns malformed JSON into a 400 rather than a 500.',
    },
    {
      problem:
        'The database host stopped the instance on 2026-10-20, after the workers’ polling had used up the month’s compute allowance.',
      fix: 'The data moved to PostgreSQL 18 on Railway with backup and restore scripts. Restore runs only into an empty database and aborts if any table’s row count differs.',
    },
  ],

  results:
    'The API exposes 65 HTTP endpoints and 25 socket event types over 28 Prisma models, and GET /health on the Railway deployment returned 200 with the database up on 2026-11-02. Through it a creator can write a prompt, script and character sheets, request a generated video of up to 15 minutes, or upload a file of up to 1,024 MB, and publish the result to home rows or the reels feed; viewers can resume, like, comment, share, follow, add to a watchlist, download, and search by title, genre or media type. The client received a test build of the app, which is not publicly listed. The timeline editor, admin panel and credit deduction in the original brief were not built.',
};

export default caseStudy;
