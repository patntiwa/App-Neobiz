import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { verify2FA } from "@/services/authService";

const TwoFactorAuth = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handle2FAVerification = async (code: string) => {
    try {
      const result = await verify2FA(code);
      if (result.success) {
        navigate('/dashboard');
      } else {
        console.error("Erreur de vérification 2FA :", result.message);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification 2FA :", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (code.length !== 6) {
      setError("Veuillez entrer un code à 6 chiffres.");
      return;
    }
    
    setIsLoading(true);
    
    await handle2FAVerification(code);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-white to-secondary/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fade-up">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-3xl font-bold text-primary">
                Neo<span className="text-accent">Biz</span>
              </h1>
            </Link>
            <div className="flex flex-col items-center gap-2 mt-4">
              <Shield className="h-10 w-10 text-accent" />
              <p className="text-lg font-medium text-text">Vérification en deux étapes</p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <Label htmlFor="otp">Code de vérification</Label>
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={code}
                  onChange={(value) => setCode(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Entrez le code à 6 chiffres envoyé à votre appareil mobile ou à votre adresse email.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90"
              disabled={isLoading}
            >
              {isLoading ? "Vérification en cours..." : "Vérifier le code"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-500">
                Vous n'avez pas reçu de code ?
              </p>
              <Button 
                variant="ghost" 
                type="button"
                className="text-accent hover:underline hover:bg-transparent text-sm"
              >
                Renvoyer le code
              </Button>
              <div className="pt-3 border-t border-gray-100">
                <Link to="/login" className="text-accent hover:underline text-sm">
                  Retour à la connexion
                </Link>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
              <p>Pour la démo, entrez n'importe quel code à 6 chiffres</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
