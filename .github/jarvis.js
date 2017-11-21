/*
test
*/
on('pull_request.edited').then( context => {
  const title = context.payload.pull_request.title
  const isWip = /\bwip\b/i.test(title)
  const status = isWip ? 'pending' : 'success'

  return context.github.repos.createStatus(context.repo({
    sha: context.payload.pull_request.head.sha,
    state: status,
    target_url: 'https://github.com/apps/wip',
    description: isWip ? 'work in progress – do not merge!' : 'ready for review',
    context: 'WIP'
  }))
} )

/*
on('pull_request.closed')
  .filter( context => context.payload.pull_request.base.ref == 'preprod' && context.payload.pull_request.merged )
  .then( context => {
    return context.github.pullRequests.create( context.repo({ 
      title: '[Deploy] ' + context.payload.pull_request.title,
      base: 'master',
      head: context.payload.pull_request.head.ref
    }) );
  });
*/
