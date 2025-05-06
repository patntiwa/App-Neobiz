import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AuthService from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';

const TwoFactorAuth = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { checkAuth } = useAuth(); // Utiliser checkAuth pour rafraîchir l'état utilisateur

  const handle2FAVerification = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // AuthService.verify2FA devrait confirmer le code.
      // Le backend met à jour la session pour indiquer une authentification complète.
      const result = await AuthService.verify2FA(code);
      if (result.success) {
        // Rafraîchir l'état de l'utilisateur depuis le contexte après une vérification 2FA réussie
        const authSuccessful = await checkAuth();
        if (authSuccessful) {
          navigate('/dashboard'); // Ou la destination post-connexion souhaitée
        } else {
          setError("Échec de la finalisation de la session après vérification 2FA. Veuillez réessayer.");
        }
      } else {
        setError(result.message || "Code de vérification invalide.");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite lors de la vérification du code.");
      console.error("Erreur lors de la vérification 2FA :", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError("Veuillez entrer un code à 6 chiffres.");
      return;
    }
    await handle2FAVerification(code);
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError(null); // Effacer les erreurs précédentes
    try {
      const result = await AuthService.resend2FACode(); // Assurez-vous que cette méthode existe dans AuthService
      if (!result.success) {
        setError(result.message || "Échec de la tentative de renvoi du code.");
      }
      // Optionnel: afficher un message de succès (ex: "Code renvoyé") via un toast ou un état temporaire
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite lors du renvoi du code.");
      console.error("Erreur lors du renvoi du code 2FA :", err);
    } finally {
      setIsResending(false);
    }
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
