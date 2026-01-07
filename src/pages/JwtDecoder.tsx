import { useState } from 'react';

export const JwtDecoder = () => {
  const [jwt, setJwt] = useState('');
  const [decoded, setDecoded] = useState<{
    header: any;
    payload: any;
    signature: string;
  } | null>(null);
  const [error, setError] = useState('');

  const decodeJwt = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. JWT must have 3 parts separated by dots.');
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      const signature = parts[2];

      setDecoded({ header, payload, signature });
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to decode JWT');
      setDecoded(null);
    }
  };

  const handleInputChange = (value: string) => {
    setJwt(value);
    if (value.trim()) {
      decodeJwt(value.trim());
    } else {
      setDecoded(null);
      setError('');
    }
  };

  const isExpired = (exp: number) => {
    return exp * 1000 < Date.now();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          JWT Decoder
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Decode and inspect JSON Web Tokens
        </p>
      </div>

      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          JWT Token
        </label>
        <textarea
          value={jwt}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Paste your JWT token here..."
          className="textarea-field h-32 resize-none"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {/* Decoded Output */}
      {decoded && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Header
            </h3>
            <pre className="bg-gray-50 dark:bg-gray-900 rounded p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-100">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
            <div className="mt-3 space-y-1 text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                <strong>Algorithm:</strong> {decoded.header.alg || 'N/A'}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <strong>Type:</strong> {decoded.header.typ || 'N/A'}
              </div>
            </div>
          </div>

          {/* Payload */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Payload (Claims)
            </h3>
            <pre className="bg-gray-50 dark:bg-gray-900 rounded p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-100">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
            
            {/* Standard Claims */}
            <div className="mt-4 space-y-2">
              {decoded.payload.iss && (
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Issuer (iss):</span>
                  <span className="ml-2 font-mono text-gray-900 dark:text-gray-100">
                    {decoded.payload.iss}
                  </span>
                </div>
              )}
              {decoded.payload.sub && (
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subject (sub):</span>
                  <span className="ml-2 font-mono text-gray-900 dark:text-gray-100">
                    {decoded.payload.sub}
                  </span>
                </div>
              )}
              {decoded.payload.aud && (
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Audience (aud):</span>
                  <span className="ml-2 font-mono text-gray-900 dark:text-gray-100">
                    {decoded.payload.aud}
                  </span>
                </div>
              )}
              {decoded.payload.exp && (
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Expires (exp):</span>
                  <span className={`ml-2 font-mono ${
                    isExpired(decoded.payload.exp) 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    {new Date(decoded.payload.exp * 1000).toLocaleString()}
                    {isExpired(decoded.payload.exp) && ' (EXPIRED)'}
                  </span>
                </div>
              )}
              {decoded.payload.nbf && (
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Not Before (nbf):</span>
                  <span className="ml-2 font-mono text-gray-900 dark:text-gray-100">
                    {new Date(decoded.payload.nbf * 1000).toLocaleString()}
                  </span>
                </div>
              )}
              {decoded.payload.iat && (
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Issued At (iat):</span>
                  <span className="ml-2 font-mono text-gray-900 dark:text-gray-100">
                    {new Date(decoded.payload.iat * 1000).toLocaleString()}
                  </span>
                </div>
              )}
              {decoded.payload.jti && (
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">JWT ID (jti):</span>
                  <span className="ml-2 font-mono text-gray-900 dark:text-gray-100">
                    {decoded.payload.jti}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Signature */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Signature
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 overflow-x-auto text-sm font-mono break-all text-gray-900 dark:text-gray-100">
              {decoded.signature}
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Signature verification requires the secret key and cannot be performed client-side.
            </p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
          ⚠️ Security Note:
        </h3>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          This tool only <strong>decodes</strong> JWTs - it does not verify signatures.
          Never paste sensitive production tokens into online tools. JWTs are not encrypted,
          only Base64 encoded, so anyone can read the contents.
        </p>
      </div>

      {/* About JWT */}
      <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          About JWT:
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• JWT consists of 3 parts: Header, Payload, and Signature</li>
          <li>• Parts are separated by dots (.)</li>
          <li>• Header and Payload are Base64-encoded JSON</li>
          <li>• Signature is used to verify the token hasn't been tampered with</li>
        </ul>
      </div>
    </div>
  );
};
