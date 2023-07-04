import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class KeyMiddleware {
  public async handle({request , response}: HttpContextContract, next: () => Promise<void>) {
    const expectedKey = '99me3ZSLO0zYFHctlvswY7Y4pkjG0uSK';
    const appKey = await request.header('app-key');
    if (appKey !== expectedKey) {
      return response.status(401).send('Unauthorized');
    }
    await next()
  }
}
