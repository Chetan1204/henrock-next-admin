// pages/api/submit.js
import { withSession } from '../../lib/session/session';

async function handler(req, res) {
    
    const { email,password } = req.body;
    
     // Make an API call to an external service to get the token (e.g., from your authentication API)
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/parent/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

    // Store form data in session
    req.session.formData = formData;
    await req.session.save();
    
    res.status(200).json({ message: 'Form submitted successfully' });
   
}

export default withSession(handler);
