import KontentService from '@/services/KontentService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.KONTENT_PREVIEW_SECRET ||
    !req.query.codename
  ) {
    return res
      .status(401)
      .json({ message: 'Invalid token or codename not specified' })
  }

  // Fetch the headless CMS to check if the provided `codename` exists
  if (Array.isArray(req.query.codename))
  {
    return res
      .status(500)
      .json({ message: 'Wrong data for codename parameter.'})
  }

  const page = await KontentService.Instance(true).getItem(req.query.codename)

  // If the codename doesn't exist prevent preview mode from being enabled
  if (!page) {
    return res.status(401).json({ message: 'Invalid codename' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${req.query.codename != "homepage" ? req.query.codename : ''}` })
  res.end()
}