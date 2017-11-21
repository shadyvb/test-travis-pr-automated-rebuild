/*
Do not merge PRs with WIP in title
*/
on('pull_request.edited').then( context => {
  const title = context.payload.pull_request.title
  const isWip = /\bwip\b/i.test(title)
  const status = isWip ? 'pending' : 'success'

  return context.github.repos.createStatus(context.repo({
    sha: context.payload.pull_request.head.sha,
    state: status,
    target_url: 'https://github.com/apps/jarvis',
    description: isWip ? 'work in progress – do not merge!' : 'ready for review',
    context: 'WIP'
  }))
} )

/*
Open PRs to master when preprod PRs gets merged
*/
on('pull_request.closed')
  .filter( context => context.payload.pull_request.base.ref == 'preprod' && context.payload.pull_request.merged )
  .then( context => {
    return context.github.pullRequests.create( context.repo({ 
      title: '[Deploy] ' + context.payload.pull_request.title,
      base: 'master',
      head: context.payload.pull_request.head.ref
    }) );
  });

/*
Open PRs to master when preprod PRs gets merged
*/
on('pull_request.opened')
  .filter( context => ! context.payload.pull_request.body.includes( 'JIRA' ) )
  .then( context => {
    return context.github.repos.createStatus(context.repo({
      sha: context.payload.pull_request.head.sha,
      state: status,
      target_url: 'https://github.com/apps/jarvis',
      description: isWip ? 'Missing JIRA ID' : 'Got JIRA ID',
      context: 'valid'
    }))
  });
on('pull_request.edited')
  .filter( context => ! context.payload.pull_request.body.includes( 'JIRA' ) )
  .then( context => {
    return context.github.repos.createStatus(context.repo({
      sha: context.payload.pull_request.head.sha,
      state: status,
      target_url: 'https://github.com/apps/jarvis',
      description: isWip ? 'Missing JIRA ID' : 'Got JIRA ID',
      context: 'valid'
    }))
  });
