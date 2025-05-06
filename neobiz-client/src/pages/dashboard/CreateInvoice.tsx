// @ts-nocheck
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, CheckCircle2, AlertTriangle } from "lucide-react"

const CreateInvoice = () => {
  const [customer, setCustomer] = useState('');
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [items, setItems] = useState([{ id: 1, description: '', quantity: 1, unitPrice: 0 }]);
  const [taxRate, setTaxRate] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Draft');

  const addItem = () => {
    setItems([...items, { id: items.length + 1, description: '', quantity: 1, unitPrice: 0 }]);
  };

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  };

  const calculateTax = (subtotal: number) => {
    const tax = taxRate ? (subtotal * parseFloat(taxRate) / 100) : 0;
    return parseFloat(tax.toFixed(2));
  };

  const calculateDiscount = (subtotal: number) => {
    const discount = discountRate ? (subtotal * parseFloat(discountRate) / 100) : 0;
    return parseFloat(discount.toFixed(2));
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const discount = calculateDiscount(subtotal);
    const total = subtotal + tax - discount + shippingCost;
    return parseFloat(total.toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
  }, [items, taxRate, discountRate, shippingCost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle invoice submission logic here
    console.log('Invoice Data:', {
      customer,
      invoiceDate,
      dueDate,
      items,
      taxRate,
      discountRate,
      shippingCost,
      notes,
      status,
      subtotal: calculateSubtotal(),
      tax: calculateTax(calculateSubtotal()),
      discount: calculateDiscount(calculateSubtotal()),
      total: calculateTotal(),
    });
  };

  const taxRates = ["0", "5", "10", "15", "20"];
  const discountRates = ["0", "5", "10", "15", "20", "25", "30"];

  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Créer une Facture
            </h2>
            <p className="text-muted-foreground mt-2">
              Remplissez les détails de la facture ci-dessous
            </p>
          </div>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Informations de la Facture</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Client</Label>
                  <Input
                    type="text"
                    id="customer"
                    placeholder="Nom du client"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Statut</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Sélectionner le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">
                        <div className="flex items-center"><AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" /> Draft</div>
                      </SelectItem>
                      <SelectItem value="Pending">
                        <div className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-blue-500" /> En attente</div>
                      </SelectItem>
                      <SelectItem value="Paid">
                        <div className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Payée</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date de la Facture</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !invoiceDate && "text-muted-foreground"
                        )}
                      >
                        {invoiceDate ? (
                          format(invoiceDate, "PPP")
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={invoiceDate}
                        onSelect={setInvoiceDate}
                        disabled={(date) =>
                          date > new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Date d'échéance</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dueDate && "text-muted-foreground"
                        )}
                      >
                        {dueDate ? (
                          format(dueDate, "PPP")
                        ) : (
                          <span>Choisir une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        disabled={(date) =>
                          date < invoiceDate
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label>Éléments de la Facture</Label>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <Input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Quantité"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                      />
                      <Input
                        type="number"
                        placeholder="Prix unitaire"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                      />
                      <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>Supprimer</Button>
                    </div>
                  ))}
                  <Button variant="secondary" size="sm" onClick={addItem}><PlusCircle className="mr-2 h-4 w-4" /> Ajouter un élément</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Taux de Taxe (%)</Label>
                  <Select value={taxRate} onValueChange={setTaxRate}>
                    <SelectTrigger id="taxRate">
                      <SelectValue placeholder="Sélectionner le taux" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxRates.map(rate => (
                        <SelectItem key={rate} value={rate}>{rate}%</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Taux de Remise (%)</Label>
                  <Select value={discountRate} onValueChange={setDiscountRate}>
                    <SelectTrigger id="discountRate">
                      <SelectValue placeholder="Sélectionner le taux" />
                    </SelectTrigger>
                    <SelectContent>
                      {discountRates.map(rate => (
                        <SelectItem key={rate} value={rate}>{rate}%</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="shipping">Frais de Livraison</Label>
                  <Input
                    type="number"
                    id="shipping"
                    placeholder="0.00"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Notes supplémentaires"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-lg font-semibold">Sous-total: {calculateSubtotal()} €</div>
                  <div className="text-lg font-semibold">Taxe: {calculateTax(calculateSubtotal())} €</div>
                  <div className="text-lg font-semibold">Remise: {calculateDiscount(calculateSubtotal())} €</div>
                </div>
                <div className="text-2xl font-bold text-primary">Total: {calculateTotal()} €</div>
              </div>

              <Button type="submit" className="w-full">Créer la Facture</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateInvoice;
