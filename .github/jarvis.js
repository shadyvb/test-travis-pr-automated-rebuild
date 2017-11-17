on('issues.opened').filter( context => context.payload.issue.body.includes( 'Thank you' ) ).comment(`
Hello @{{ sender.login }}. Thanks for submitting an issue, expect a reply within 48 seconds!
`);
