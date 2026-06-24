// Discord Embedded App SDK Rich Presence for Sonic Mania
// Add <script src="discord-presence.js"></script> to RSDKv5.html before RSDKv5.js

(async () => {
  // Load the Discord Embedded App SDK
  const { DiscordSDK } = await import('https://www.unpkg.com/@discord/embedded-app-sdk@1.2.0/output/index.mjs');

  const discordSdk = new DiscordSDK('1518811573840253048');

  await discordSdk.ready();

  // Authorize with Discord
  const { code } = await discordSdk.commands.authorize({
    client_id: '1518811573840253048',
    response_type: 'code',
    state: '',
    prompt: 'none',
    scope: ['identify', 'rpc.activities.write'],
  });

  // Set Rich Presence to mirror the game's native presence
  await discordSdk.commands.setActivity({
    activity: {
      type: 0, // Playing
      details: 'Discord Port',
      state: 'Playing Solo',
      timestamps: {
        start: Math.floor(Date.now() / 1000),
      },
      assets: {
        large_image: 'sonic_mania_large',
        large_text: 'Sonic Mania Plus',
        small_image: 'sonic_mania_small',
        small_text: 'Sonic Mania Plus',
      },
      party: {
        id: 'ae488379-351d-4a4f-ad32-2b9b01c91657',
        size: [1, 5],
      },
    },
  });

  console.log('[Discord] Rich Presence set!');
})();
