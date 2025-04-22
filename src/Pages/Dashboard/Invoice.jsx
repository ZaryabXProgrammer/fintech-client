import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { userRequest } from '../../lib/RequestMethods';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Image
} from '@react-pdf/renderer';
import { format } from 'date-fns';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #0D9488',
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  logo: {
    color: '#0D9488',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0D9488',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0D9488',
    backgroundColor: '#f0f9f8',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
  },
  col: {
    flexGrow: 1,
    fontSize: 10,
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    marginBottom: 5,
  },
  transactionHeader: {
    backgroundColor: '#f0f9f8',
    fontWeight: 'bold',
    color: '#0D9488',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderTopStyle: 'solid',
    paddingTop: 10,
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
  },
  summaryBox: {
    backgroundColor: '#f0f9f8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D9488',
  },
});


const InvoicePDF = ({ invoiceData }) => {

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logo}>FINCONNECT</Text>
            <Text style={styles.subtitle}>Financial solutions for everyone</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.value}>Invoice #{invoiceData.invoiceInfo.invoiceNumber}</Text>
            <Text style={styles.value}>Date: {formatDate(invoiceData.invoiceInfo.generatedDate)}</Text>
          </View>
        </View>

        {/* Invoice Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Information</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Billed To:</Text>
              <Text style={styles.value}>{invoiceData.invoiceInfo.userDetails.name}</Text>
              <Text style={styles.value}>{invoiceData.invoiceInfo.userDetails.email}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Period:</Text>
              <Text style={styles.value}>{formatDate(invoiceData.dateRange.start)} - {formatDate(invoiceData.dateRange.end)}</Text>
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryBox}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={styles.label}>Total Transactions:</Text>
              <Text style={styles.value}>{invoiceData.summary.totalTransactions}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={styles.label}>Total Amount:</Text>
              <Text style={styles.totalAmount}>${invoiceData.summary.totalAmount.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={styles.label}>Net Change:</Text>
              <Text style={styles.value}>${invoiceData.summary.netChange.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={styles.label}>Average Amount:</Text>
              <Text style={styles.value}>${invoiceData.summary.avgAmount.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.label}>Current Balance:</Text>
              <Text style={styles.value}>${invoiceData.summary.currentBalance.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Transaction Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction Breakdown</Text>
          {Object.entries(invoiceData.breakdown).map(([type, count]) => (
            <View key={type} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 }}>
              <Text style={styles.value}>{type.charAt(0).toUpperCase() + type.slice(1)}:</Text>
              <Text style={styles.value}>{count}</Text>
            </View>
          ))}
        </View>

        {/* Transactions Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transactions</Text>

          {/* Table Header */}
          <View style={[styles.row, styles.transactionHeader]}>
            <Text style={[styles.col, { flex: 1.5 }]}>Reference</Text>
            <Text style={[styles.col, { flex: 1 }]}>Type</Text>
            <Text style={[styles.col, { flex: 1 }]}>Amount</Text>
            <Text style={[styles.col, { flex: 1.5 }]}>Date</Text>
            <Text style={[styles.col, { flex: 1 }]}>Status</Text>
          </View>

          {/* Table Rows */}
          {invoiceData.transactions.map((transaction) => (
            <View key={transaction.id} style={styles.row}>
              <Text style={[styles.col, { flex: 1.5 }]}>{transaction.reference}</Text>
              <Text style={[styles.col, { flex: 1 }]}>{transaction.type}</Text>
              <Text style={[styles.col, { flex: 1 }]}>
                {transaction.direction === 'incoming' ? '+' : '-'}
                {transaction.currency} {transaction.amount}
              </Text>
              <Text style={[styles.col, { flex: 1.5 }]}>{formatDate(transaction.timestamp)}</Text>
              <Text style={[styles.col, { flex: 1 }]}>{transaction.status}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>This is an automatically generated invoice from FINCONNECT.</Text>
          <Text>© {new Date().getFullYear()} FINCONNECT. All rights reserved.</Text>
        </View>
      </Page>
    </Document>
  );
};

const Invoice = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    invoiceType: 'detailed',
    format: 'pdf'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await userRequest.get("/invoice", {
        params: {
          start: formData.startDate,
          end: formData.endDate,
        },
      });

      // Set the invoice data from response
      setInvoiceData(res.data);
      setIsGenerated(true);
    } catch (err) {
      console.error("Error generating invoice:", err);
      // optionally show an error message here
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
      }, 2000);
    }
  };

  const togglePdfPreview = () => {
    setShowPdfPreview(!showPdfPreview);
  };

  // Sample invoice data for testing
  const sampleInvoiceData = {
    "invoiceInfo": {
      "invoiceNumber": "INV-53885929",
      "generatedDate": "2025-04-22T20:31:25.929Z",
      "userDetails": {
        "name": "muhammad  zaryab",
        "email": "zaryab921@gmail.com",
        "id": "6807f77ed92dd844d87943ce"
      }
    },
    "dateRange": {
      "start": "2025-04-22",
      "end": "2025-04-24"
    },
    "summary": {
      "totalTransactions": 1,
      "totalAmount": 100,
      "netChange": 100,
      "avgAmount": 100,
      "currentBalance": 900
    },
    "breakdown": {
      "transfer": 1
    },
    "transactions": [
      {
        "id": "6807f9cdd92dd844d8794446",
        "reference": "TRF-ed3859e6-5749",
        "type": "transfer",
        "amount": 100,
        "currency": "USD",
        "description": "Funds transfer",
        "notes": "",
        "timestamp": "2025-04-22T20:19:25.750Z",
        "formattedDate": "23/04/2025, 1:19:25 am",
        "status": "completed",
        "counterparty": {
          "id": "6807f77ed92dd844d87943ce",
          "name": "muhammad  zaryab",
          "email": "zaryab921@gmail.com"
        },
        "direction": "incoming",
        "balanceAfter": 1140
      }
    ]
  };

  return (
    <motion.div
      className="w-full p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-themeGreen"
        variants={itemVariants}
      >
        Generate Invoice
      </motion.h1>

      <motion.div
        className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 mb-8"
        variants={itemVariants}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-400 mb-2" htmlFor="startDate">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2" htmlFor="endDate">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                required
              />
            </div>
          </div>

          

          <motion.button
            type="submit"
            className="w-full bg-themeGreen text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Invoice...
              </div>
            ) : 'Generate Invoice'}
          </motion.button>
        </form>
      </motion.div>

      {isGenerated && (
        <motion.div
          className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-themeGreen rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Your Invoice is Ready!</h3>
              <p className="text-gray-400">Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4 flex-wrap">
              <div className="mb-2 sm:mb-0">
                <p className="text-gray-400 text-sm">Invoice ID</p>
                <p className="font-medium">{invoiceData?.invoiceInfo?.invoiceNumber || sampleInvoiceData.invoiceInfo.invoiceNumber}</p>
              </div>
              <div className="mb-2 sm:mb-0">
                <p className="text-gray-400 text-sm">Period</p>
                <p className="font-medium">
                  {format(new Date(invoiceData?.dateRange?.start || sampleInvoiceData.dateRange.start), 'yyyy-MM-dd')} to {format(new Date(invoiceData?.dateRange?.end || sampleInvoiceData.dateRange.end), 'yyyy-MM-dd')}
                </p>
              </div>
              <div className="mb-2 sm:mb-0">
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="font-medium text-white">${invoiceData?.summary?.totalAmount?.toFixed(2) || sampleInvoiceData.summary.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={togglePdfPreview}
              className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {showPdfPreview ? 'Hide PDF Preview' : 'View PDF Preview'}
            </motion.button>

            <PDFDownloadLink
              document={<InvoicePDF invoiceData={invoiceData || sampleInvoiceData} />}
              fileName={`FINCONNECT_Invoice_${invoiceData?.invoiceInfo?.invoiceNumber || sampleInvoiceData.invoiceInfo.invoiceNumber}.pdf`}
              className="flex items-center px-6 py-3 bg-themeGreen hover:bg-opacity-90 rounded-lg text-white transition-colors duration-200"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {({ loading }) => (
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {loading ? 'Loading document...' : 'Download Invoice PDF'}
                </motion.div>
              )}
            </PDFDownloadLink>
          </div>

          {showPdfPreview && (
            <div className="mt-6 border border-gray-700 rounded-lg overflow-hidden" style={{ height: '70vh' }}>
              <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
                <InvoicePDF invoiceData={invoiceData || sampleInvoiceData} />
              </PDFViewer>
            </div>
          )}
        </motion.div>
      )}

    
    </motion.div>
  );
};

export default Invoice;